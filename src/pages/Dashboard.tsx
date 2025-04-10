
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FamilyMember, ChewingData } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { format, subDays, parseISO } from 'date-fns';

const Dashboard = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Fetch family members
  const { data: familyMembers, isLoading: loadingMembers } = useQuery({
    queryKey: ['familyMembers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .order('relationship', { ascending: false }) // This will put 'elder' first if sorted alphabetically
        .order('name');

      if (error) throw error;
      return data as FamilyMember[];
    },
  });

  // Set initial selected member when data loads - prioritize elders
  useEffect(() => {
    if (familyMembers?.length && !selectedMember) {
      const elderMember = familyMembers.find(m => 
        m.relationship.toLowerCase() === 'elder' || 
        m.relationship.toLowerCase() === 'elderly' || 
        m.relationship.toLowerCase() === 'older adult'
      );
      setSelectedMember(elderMember?.id || familyMembers[0].id);
    }
  }, [familyMembers, selectedMember]);

  // Fetch chewing data for selected member
  const { data: chewingData, isLoading: loadingChewingData } = useQuery({
    queryKey: ['chewingData', selectedMember, timeRange],
    queryFn: async () => {
      if (!selectedMember) return [];

      // Calculate date range based on selected time range
      let daysLookback = 7;
      if (timeRange === 'weekly') daysLookback = 28;
      if (timeRange === 'monthly') daysLookback = 90;

      const { data, error } = await supabase
        .from('chewing_data')
        .select('*')
        .eq('family_member_id', selectedMember)
        .gte('date', format(subDays(new Date(), daysLookback), 'yyyy-MM-dd'))
        .order('date', { ascending: true });

      if (error) throw error;
      
      // Process the data to organize by date and time
      const processedData = (data as ChewingData[]).map(item => {
        // If there's a timestamp field, we would use that to extract time
        // Since we don't have that in the current schema, we'll just use the count
        return {
          ...item,
          // Format the date for display
          formattedDate: format(new Date(item.date), 'MMM dd')
        };
      });
      
      return processedData;
    },
    enabled: !!selectedMember,
  });

  const chartData = React.useMemo(() => {
    if (!chewingData) return [];

    return chewingData.map(item => ({
      date: item.formattedDate,
      count: item.count
    }));
  }, [chewingData]);

  const getChartConfig = () => {
    return {
      chewing: {
        label: "Chewing Count",
        theme: {
          light: "#7FB069", // solarpunk.leaf
          dark: "#A7CAB1" // solarpunk.seafoam
        }
      },
      average: {
        label: "Average",
        theme: {
          light: "#D8836F", // solarpunk.terracotta
          dark: "#E6B055" // solarpunk.ochre
        }
      }
    };
  };

  const averageCount = React.useMemo(() => {
    if (!chewingData?.length) return 0;
    const sum = chewingData.reduce((acc, data) => acc + data.count, 0);
    return Math.round(sum / chewingData.length);
  }, [chewingData]);

  const selectedMemberDetails = React.useMemo(() => {
    if (!familyMembers || !selectedMember) return null;
    return familyMembers.find(member => member.id === selectedMember);
  }, [familyMembers, selectedMember]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-semibold text-solarpunk-night">Health Dashboard</h1>
            <p className="text-muted-foreground">Track chewing metrics and health data</p>
          </div>

          {!loadingMembers && familyMembers?.length > 0 && (
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <Select 
                value={selectedMember || undefined} 
                onValueChange={(value) => setSelectedMember(value)}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select family member" />
                </SelectTrigger>
                <SelectContent>
                  {/* First list elderly members */}
                  {familyMembers
                    .filter(member => 
                      member.relationship.toLowerCase() === 'elder' || 
                      member.relationship.toLowerCase() === 'elderly' || 
                      member.relationship.toLowerCase() === 'older adult'
                    )
                    .map((member) => (
                      <SelectItem key={member.id} value={member.id} className="font-medium">
                        {member.name} ({member.relationship}) ⭐
                      </SelectItem>
                    ))
                  }
                  {/* Then list other members */}
                  {familyMembers
                    .filter(member => 
                      member.relationship.toLowerCase() !== 'elder' && 
                      member.relationship.toLowerCase() !== 'elderly' && 
                      member.relationship.toLowerCase() !== 'older adult'
                    )
                    .map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} ({member.relationship})
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>

              <Select
                value={timeRange} 
                onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setTimeRange(value)}
              >
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Family Members Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loadingMembers ? (
            <Card className="col-span-full animate-pulse">
              <CardHeader>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-slate-200 rounded"></div>
              </CardContent>
            </Card>
          ) : (
            familyMembers?.map((member) => (
              <Card 
                key={member.id}
                className={`cursor-pointer transition-all ${
                  selectedMember === member.id ? 'ring-2 ring-solarpunk-leaf' : ''
                } ${
                  member.relationship.toLowerCase() === 'elder' ||
                  member.relationship.toLowerCase() === 'elderly' ||
                  member.relationship.toLowerCase() === 'older adult'
                    ? 'border-solarpunk-leaf border-2' : ''
                }`}
                onClick={() => setSelectedMember(member.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar_url || ''} alt={member.name} />
                        <AvatarFallback className={`${
                          member.relationship.toLowerCase() === 'elder' ||
                          member.relationship.toLowerCase() === 'elderly' ||
                          member.relationship.toLowerCase() === 'older adult'
                            ? 'bg-solarpunk-leaf text-white' 
                            : 'bg-solarpunk-seafoam text-solarpunk-night'
                        }`}>
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {member.name}
                      {(member.relationship.toLowerCase() === 'elder' || 
                        member.relationship.toLowerCase() === 'elderly' || 
                        member.relationship.toLowerCase() === 'older adult') && 
                        <span className="text-xs px-2 py-1 bg-solarpunk-leaf text-white rounded-full">Elder</span>
                      }
                    </div>
                  </CardTitle>
                  <CardDescription>{member.relationship}</CardDescription>
                </CardHeader>
              </Card>
            ))
          )}
        </div>

        {/* Chewing Data Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              Chewing Activity {selectedMemberDetails ? `- ${selectedMemberDetails.name}` : ''}
            </CardTitle>
            <CardDescription>
              {timeRange === 'daily' && 'Daily chewing count for the past week'}
              {timeRange === 'weekly' && 'Daily chewing count for the past month'}
              {timeRange === 'monthly' && 'Daily chewing count for the past three months'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingChewingData ? (
              <div className="h-96 bg-slate-100 animate-pulse rounded"></div>
            ) : chartData.length > 0 ? (
              <div className="h-96 w-full"> {/* Increased height for better visualization */}
                <ChartContainer
                  config={getChartConfig()}
                  className="w-full aspect-[3/2]" {/* Control aspect ratio for better fit */}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 20, right: 30, bottom: 30, left: 20 }}
                    >
                      <defs>
                        <linearGradient id="colorChewing" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7FB069" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#7FB069" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#6B7280"
                        tick={{ fontSize: 12 }}
                        tickMargin={10}
                      />
                      <YAxis 
                        stroke="#6B7280"
                        tick={{ fontSize: 12 }}
                      />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent 
                            labelClassName="font-medium text-solarpunk-night" 
                            indicator="dot" 
                          />
                        }
                      />
                      <Area 
                        type="monotone" 
                        dataKey="count" 
                        name="chewing" 
                        stroke="#7FB069" 
                        fillOpacity={1} 
                        fill="url(#colorChewing)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                No chewing data available for the selected time range.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Chews</CardTitle>
              <CardDescription>Per day in selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-solarpunk-leaf">{averageCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Days Tracked</CardTitle>
              <CardDescription>Number of days with data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-solarpunk-sky">
                {chewingData?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Maximum Chews</CardTitle>
              <CardDescription>Highest count in period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-solarpunk-terracotta">
                {chewingData?.length 
                  ? Math.max(...chewingData.map(d => d.count)) 
                  : 0}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

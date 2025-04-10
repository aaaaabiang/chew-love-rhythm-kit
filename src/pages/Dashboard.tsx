
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FamilyMember, ChewingData } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { format, subDays } from 'date-fns';

const Dashboard = () => {
  const [selectedElder, setSelectedElder] = useState<string | null>(null);
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Fetch all family members
  const { data: familyMembers, isLoading: loadingMembers } = useQuery({
    queryKey: ['familyMembers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .order('relationship', { ascending: false })
        .order('name');

      if (error) throw error;
      return data as FamilyMember[];
    },
  });

  // Find elder members for the navigation section
  const elderMembers = React.useMemo(() => {
    if (!familyMembers) return [];
    
    const elders = familyMembers.filter(member => 
      member.relationship.toLowerCase() === 'elder' || 
      member.relationship.toLowerCase() === 'elderly' || 
      member.relationship.toLowerCase() === 'older adult'
    );
    
    // Take up to 2 elders to show in the nav
    return elders.slice(0, 2); 
  }, [familyMembers]);

  // Non-elder family members for the dropdown filter
  const familyFilters = React.useMemo(() => {
    if (!familyMembers) return [];
    
    return familyMembers.filter(member => 
      member.relationship.toLowerCase() !== 'elder' && 
      member.relationship.toLowerCase() !== 'elderly' && 
      member.relationship.toLowerCase() !== 'older adult'
    );
  }, [familyMembers]);

  // Set initial selected elder when data loads
  useEffect(() => {
    if (elderMembers.length && !selectedElder) {
      setSelectedElder(elderMembers[0].id);
    }
  }, [elderMembers, selectedElder]);

  // Fetch chewing data for selected elder
  const { data: chewingData, isLoading: loadingChewingData } = useQuery({
    queryKey: ['chewingData', selectedElder, selectedFamilyFilter, timeRange],
    queryFn: async () => {
      if (!selectedElder) return [];

      // Calculate date range based on selected time range
      let daysLookback = 7;
      if (timeRange === 'weekly') daysLookback = 28;
      if (timeRange === 'monthly') daysLookback = 90;

      let query = supabase
        .from('chewing_data')
        .select('*')
        .eq('family_member_id', selectedElder)
        .gte('date', format(subDays(new Date(), daysLookback), 'yyyy-MM-dd'))
        .order('date', { ascending: true });
      
      // If we're filtering by a specific family member interaction, we would add that filter here
      // Note: This assumes there's a way to filter by family member in your schema
      // You may need to adjust this based on your actual data model
      
      const { data, error } = await query;

      if (error) throw error;
      
      // Process the data to organize by date and time
      const processedData = (data as ChewingData[]).map(item => {
        return {
          ...item,
          // Format the date for display
          formattedDate: format(new Date(item.date), 'MMM dd')
        };
      });
      
      return processedData;
    },
    enabled: !!selectedElder,
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

  const selectedElderDetails = React.useMemo(() => {
    if (!familyMembers || !selectedElder) return null;
    return familyMembers.find(member => member.id === selectedElder);
  }, [familyMembers, selectedElder]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-semibold text-solarpunk-night">Health Dashboard</h1>
            <p className="text-muted-foreground">Track chewing metrics and health data</p>
          </div>

          {!loadingMembers && (
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <Select
                value={selectedFamilyFilter} 
                onValueChange={(value) => setSelectedFamilyFilter(value)}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by interaction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interactions</SelectItem>
                  {familyFilters.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      With {member.name} ({member.relationship})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={timeRange} 
                onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setTimeRange(value)}
              >
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Time range" />
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

        {/* Elder Persons Navigation Section */}
        {!loadingMembers && elderMembers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-solarpunk-night mb-3">Elder Dashboard</h2>
            <div className="flex flex-wrap gap-4">
              {elderMembers.map((elder) => (
                <Card 
                  key={elder.id}
                  className={`cursor-pointer transition-all w-full sm:w-64 ${
                    selectedElder === elder.id ? 'ring-2 ring-solarpunk-leaf bg-solarpunk-seafoam/10' : ''
                  } border-solarpunk-leaf border-2`}
                  onClick={() => setSelectedElder(elder.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={elder.avatar_url || ''} alt={elder.name} />
                          <AvatarFallback className="bg-solarpunk-leaf text-white">
                            {elder.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          {elder.name}
                          <span className="text-xs ml-2 px-2 py-1 bg-solarpunk-leaf text-white rounded-full">Elder</span>
                        </div>
                      </div>
                    </CardTitle>
                    <CardDescription>{elder.relationship}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Chewing Data Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedElderDetails ? `${selectedElderDetails.name}'s Chewing Activity` : 'Chewing Activity'}
              {selectedFamilyFilter !== 'all' && familyMembers && (
                <span className="text-sm font-normal ml-2">
                  with {familyMembers.find(m => m.id === selectedFamilyFilter)?.name || ''}
                </span>
              )}
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
              <div className="h-96 w-full"> {/* Keeps the increased height */}
                <ChartContainer
                  config={getChartConfig()}
                  className="w-full aspect-[3/2]" /* Keeps the better aspect ratio */
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


import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FamilyMember, Device, DeviceAssignment } from '@/types';
import { PlusCircle, Trash2, RefreshCw, Settings, Users, Smartphone, Link } from 'lucide-react';

const Admin = () => {
  const queryClient = useQueryClient();
  const [openFamilyDialog, setOpenFamilyDialog] = useState(false);
  const [openDeviceDialog, setOpenDeviceDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState('family');
  
  // Form states
  const [newFamilyMember, setNewFamilyMember] = useState({ name: '', relationship: '' });
  const [newDevice, setNewDevice] = useState({ name: '', status: 'online' });
  const [newAssignment, setNewAssignment] = useState({ device_id: '', family_member_id: '' });

  // Fetch family members
  const { data: familyMembers, isLoading: loadingFamilyMembers } = useQuery({
    queryKey: ['familyMembers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as FamilyMember[];
    },
  });

  // Fetch devices
  const { data: devices, isLoading: loadingDevices } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Device[];
    },
  });

  // Fetch device assignments
  const { data: deviceAssignments, isLoading: loadingAssignments } = useQuery({
    queryKey: ['deviceAssignments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('device_assignments')
        .select(`
          id,
          device_id,
          family_member_id,
          assigned_at,
          created_at,
          devices:device_id (name, status),
          family_members:family_member_id (name, relationship)
        `);

      if (error) throw error;
      return data as (DeviceAssignment & { 
        devices: Pick<Device, 'name' | 'status'>,
        family_members: Pick<FamilyMember, 'name' | 'relationship'>
      })[];
    },
  });

  // Add family member mutation
  const addFamilyMember = useMutation({
    mutationFn: async (data: { name: string, relationship: string }) => {
      const { data: newMember, error } = await supabase
        .from('family_members')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return newMember;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyMembers'] });
      setOpenFamilyDialog(false);
      setNewFamilyMember({ name: '', relationship: '' });
      toast.success('Family member added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add family member: ' + error.message);
    }
  });

  // Delete family member mutation
  const deleteFamilyMember = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('family_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familyMembers'] });
      queryClient.invalidateQueries({ queryKey: ['deviceAssignments'] });
      toast.success('Family member deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete family member: ' + error.message);
    }
  });

  // Add device mutation
  const addDevice = useMutation({
    mutationFn: async (data: { name: string, status: string }) => {
      const { data: newDevice, error } = await supabase
        .from('devices')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return newDevice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      setOpenDeviceDialog(false);
      setNewDevice({ name: '', status: 'online' });
      toast.success('Device added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add device: ' + error.message);
    }
  });

  // Delete device mutation
  const deleteDevice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      queryClient.invalidateQueries({ queryKey: ['deviceAssignments'] });
      toast.success('Device deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete device: ' + error.message);
    }
  });

  // Add device assignment mutation
  const addDeviceAssignment = useMutation({
    mutationFn: async (data: { device_id: string, family_member_id: string }) => {
      const { data: newAssignment, error } = await supabase
        .from('device_assignments')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return newAssignment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deviceAssignments'] });
      setOpenAssignmentDialog(false);
      setNewAssignment({ device_id: '', family_member_id: '' });
      toast.success('Device assignment created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create device assignment: ' + error.message);
    }
  });

  // Delete device assignment mutation
  const deleteDeviceAssignment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('device_assignments')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deviceAssignments'] });
      toast.success('Device assignment deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete device assignment: ' + error.message);
    }
  });

  // Toggle device status mutation
  const toggleDeviceStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const newStatus = status === 'online' ? 'offline' : 'online';
      
      const { error } = await supabase
        .from('devices')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success('Device status updated');
    },
    onError: (error) => {
      toast.error('Failed to update device status: ' + error.message);
    }
  });

  const handleSubmitFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFamilyMember.name || !newFamilyMember.relationship) {
      toast.error('Please fill in all required fields');
      return;
    }
    addFamilyMember.mutate(newFamilyMember);
  };

  const handleSubmitDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevice.name) {
      toast.error('Please fill in all required fields');
      return;
    }
    addDevice.mutate(newDevice);
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignment.device_id || !newAssignment.family_member_id) {
      toast.error('Please select both a device and a family member');
      return;
    }
    addDeviceAssignment.mutate(newAssignment);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-semibold text-solarpunk-night">Admin Panel</h1>
            <p className="text-muted-foreground">Manage family members, devices, and assignments</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                queryClient.invalidateQueries();
                toast.success('Data refreshed');
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="family" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Family Members</span>
              <span className="inline sm:hidden">Family</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center">
              <Smartphone className="h-4 w-4 mr-2" />
              <span>Devices</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center">
              <Link className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Device Assignments</span>
              <span className="inline sm:hidden">Assign</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Family Members Tab */}
          <TabsContent value="family" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={openFamilyDialog} onOpenChange={setOpenFamilyDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Family Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmitFamilyMember}>
                    <DialogHeader>
                      <DialogTitle>Add Family Member</DialogTitle>
                      <DialogDescription>
                        Create a new family member profile to link with devices.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter name"
                          value={newFamilyMember.name}
                          onChange={(e) => setNewFamilyMember({...newFamilyMember, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relationship">Relationship</Label>
                        <Select
                          value={newFamilyMember.relationship}
                          onValueChange={(value) => setNewFamilyMember({...newFamilyMember, relationship: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Elder">Elder</SelectItem>
                            <SelectItem value="Child">Child</SelectItem>
                            <SelectItem value="Parent">Parent</SelectItem>
                            <SelectItem value="Grandparent">Grandparent</SelectItem>
                            <SelectItem value="Grandchild">Grandchild</SelectItem>
                            <SelectItem value="Sibling">Sibling</SelectItem>
                            <SelectItem value="Spouse">Spouse</SelectItem>
                            <SelectItem value="Caregiver">Caregiver</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={addFamilyMember.isPending}>
                        {addFamilyMember.isPending ? 'Adding...' : 'Add Family Member'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingFamilyMembers ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center p-4">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : familyMembers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center p-4">
                        No family members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    familyMembers?.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.relationship}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
                                deleteFamilyMember.mutate(member.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={openDeviceDialog} onOpenChange={setOpenDeviceDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Device
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmitDevice}>
                    <DialogHeader>
                      <DialogTitle>Add Device</DialogTitle>
                      <DialogDescription>
                        Register a new device to the system.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="deviceName">Device Name</Label>
                        <Input
                          id="deviceName"
                          placeholder="Enter device name"
                          value={newDevice.name}
                          onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deviceStatus">Status</Label>
                        <Select
                          value={newDevice.status}
                          onValueChange={(value) => setNewDevice({...newDevice, status: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={addDevice.isPending}>
                        {addDevice.isPending ? 'Adding...' : 'Add Device'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Binding Time</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingDevices ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center p-4">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : devices?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center p-4">
                        No devices found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    devices?.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {device.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(device.binding_time).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleDeviceStatus.mutate({ id: device.id, status: device.status })}
                              title={device.status === 'online' ? 'Set Offline' : 'Set Online'}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete ${device.name}?`)) {
                                  deleteDevice.mutate(device.id);
                                }
                              }}
                              title="Delete Device"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={openAssignmentDialog} onOpenChange={setOpenAssignmentDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmitAssignment}>
                    <DialogHeader>
                      <DialogTitle>Create Device Assignment</DialogTitle>
                      <DialogDescription>
                        Link a device to a family member.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="familyMemberSelect">Family Member</Label>
                        <Select
                          value={newAssignment.family_member_id}
                          onValueChange={(value) => setNewAssignment({...newAssignment, family_member_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select family member" />
                          </SelectTrigger>
                          <SelectContent>
                            {familyMembers?.map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name} ({member.relationship})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deviceSelect">Device</Label>
                        <Select
                          value={newAssignment.device_id}
                          onValueChange={(value) => setNewAssignment({...newAssignment, device_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select device" />
                          </SelectTrigger>
                          <SelectContent>
                            {devices?.map((device) => (
                              <SelectItem key={device.id} value={device.id}>
                                {device.name} ({device.status})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={addDeviceAssignment.isPending}>
                        {addDeviceAssignment.isPending ? 'Creating...' : 'Create Assignment'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Family Member</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Device Status</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingAssignments ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center p-4">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : deviceAssignments?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center p-4">
                        No device assignments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    deviceAssignments?.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>{assignment.family_members.name}</TableCell>
                        <TableCell>{assignment.devices.name}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            assignment.devices.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {assignment.devices.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(assignment.assigned_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete this assignment?`)) {
                                deleteDeviceAssignment.mutate(assignment.id);
                              }
                            }}
                            title="Delete Assignment"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Admin;

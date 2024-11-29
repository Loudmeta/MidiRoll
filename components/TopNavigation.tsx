import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TopNavigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Piano Roll</h1>
        <Input type="text" placeholder="Project Name" className="w-40" />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline">Save</Button>
        <Button variant="outline">Export</Button>
        <Button variant="outline">Settings</Button>
      </div>
    </nav>
  );
};

export default TopNavigation;


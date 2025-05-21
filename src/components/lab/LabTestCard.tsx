"use client";

import type { LabTest } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Beaker, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface LabTestCardProps {
  test: LabTest;
}

const LabTestCard: React.FC<LabTestCardProps> = ({ test }) => {
  const { toast } = useToast();

  const handleBookTest = () => {
    // Mock booking
    toast({
      title: "Test Booking Initiated",
      description: `Your booking for ${test.name} is being processed. (This is a demo)`,
      variant: "default",
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={test.imageUrl}
          alt={test.name}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          data-ai-hint={test.dataAiHint || "lab test procedure"}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">{test.name}</CardTitle>
        <CardDescription className="text-sm h-16 overflow-hidden text-ellipsis">{test.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-xl font-bold text-primary">₹{test.price.toFixed(2)}</p>
        {test.preparation && <p className="text-xs text-muted-foreground mt-2"><strong>Preparation:</strong> {test.preparation}</p>}
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 flex gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <Info className="mr-2 h-4 w-4" /> Details
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{test.name}</AlertDialogTitle>
              <AlertDialogDescription className="max-h-60 overflow-y-auto">
                <p className="mb-2">{test.description}</p>
                {test.preparation && <p className="mb-2"><strong>Preparation:</strong> {test.preparation}</p>}
                <p><strong>Price:</strong> ₹{test.price.toFixed(2)}</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction onClick={handleBookTest} className="bg-accent hover:bg-accent/90 text-accent-foreground">Book Now</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Button onClick={handleBookTest} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
          <Beaker className="mr-2 h-4 w-4" /> Book Test
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LabTestCard;

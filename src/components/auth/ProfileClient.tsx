"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Mail, User as UserIconLucide, ShieldCheck, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileClient() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="items-center text-center pb-6">
            <Skeleton className="h-24 w-24 rounded-full mb-4" />
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
            <Skeleton className="h-10 w-full mt-6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="items-center text-center pb-6 bg-gradient-to-b from-primary/5 to-transparent">
           <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/30 ring-offset-background ring-offset-2">
             <AvatarImage src={`https://placehold.co/100x100.png`} alt={user.name || user.email} data-ai-hint="user avatar" />
            <AvatarFallback className="text-3xl">{user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold text-primary">{user.name || "User Profile"}</CardTitle>
          <CardDescription className="text-md">Manage your account information and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
            <UserIconLucide className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          
          {/* Placeholder for future features */}
          <div className="flex items-center space-x-3 p-3 border border-dashed rounded-md">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Medical History (Coming Soon)</p>
              <p className="font-medium text-muted-foreground/70">View and manage your medical records.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-dashed rounded-md">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
             <div>
              <p className="text-sm text-muted-foreground">Insurance Information (Coming Soon)</p>
              <p className="font-medium text-muted-foreground/70">Securely store your insurance details.</p>
            </div>
          </div>
          
          <Button onClick={logout} variant="destructive" className="w-full mt-4">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

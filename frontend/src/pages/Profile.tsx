import { useState } from "react";
import { User, Mail, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
}

function getUser(): UserProfile {
  try {
    const stored = localStorage.getItem("cardiosense_user");
    if (stored) return JSON.parse(stored);
  } catch {}
  return { name: "Dr. Smith", email: "doctor@hospital.com" };
}

const Profile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(getUser);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem("cardiosense_user", JSON.stringify(profile));
    setIsSaving(false);
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      {/* Avatar section */}
      <Card className="shadow-card">
        <CardContent className="flex items-center gap-6 pt-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <User className="h-10 w-10 text-primary" />
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border bg-card shadow-sm">
              <Camera className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Edit form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  className="pl-10"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prof-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="prof-email"
                  type="email"
                  className="pl-10"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="gap-2" disabled={isSaving}>
              <Save className="h-4 w-4" />
              {isSaving ? "Saving…" : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

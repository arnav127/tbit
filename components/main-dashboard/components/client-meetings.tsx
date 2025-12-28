"use client"
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Clock } from "lucide-react";

interface ClientMeetingsProps {
  meetings: any[];
  setViewAllCategory: (category: string) => void;
}

export const ClientMeetings: FC<ClientMeetingsProps> = ({ meetings, setViewAllCategory }) => {
  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base text-slate-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-slate-500" />
              Client Meetings
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => setViewAllCategory('meetings')}>View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetings?.slice(0, 5).map((meeting: any, i: number) => (
            <div key={i} className="flex gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              <div className="mt-1">
                {meeting.type === 'Upcoming' ? 
                  <Clock className="h-4 w-4 text-amber-500" /> : 
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                }
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{meeting.title}</p>
                <p className="text-xs text-slate-500">{meeting.client_name} • {new Date(meeting.date).toLocaleDateString()}</p>
                {meeting.outcome && <p className="text-xs text-slate-600 mt-1 italic">"{meeting.outcome}"</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
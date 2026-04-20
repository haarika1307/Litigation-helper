import { Calendar as CalendarIcon, Clock, Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
  const events = [
    { id: 1, title: "Deposition of John Doe", time: "09:00 AM - 12:00 PM", case: "Smith v. Johnson Corp", type: "Deposition" },
    { id: 2, title: "Submit Evidence Discovery", time: "05:00 PM Deadline", case: "Estate of M. Williams", type: "Deadline", urgent: true },
    { id: 3, title: "Pre-Trial Conference", time: "02:30 PM", case: "State v. Anderson", type: "Hearing" },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Calendar & Deadlines</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-5 min-h-[500px]">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>October 2024</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Month</Button>
                <Button variant="secondary" size="sm">Week</Button>
                <Button variant="ghost" size="sm">Day</Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Visual placeholder for a complex calendar component */}
            <div className="w-full h-full border rounded-md grid grid-cols-7 grid-rows-5 text-sm bg-muted/10">
              {/* Calendar Grid Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 border-b border-r text-center font-medium text-muted-foreground bg-white">
                  {day}
                </div>
              ))}
              {/* Empty skeleton grid items */}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="min-h-[100px] border-b border-r bg-white p-2">
                  <span className="text-muted-foreground/50">{i + 1 > 31 ? '' : i + 1}</span>
                  {i === 11 && (
                    <div className="mt-1 p-1 bg-blue-100 text-blue-800 text-xs rounded truncate">
                      Smith Deposition
                    </div>
                  )}
                  {i === 14 && (
                    <div className="mt-1 p-1 bg-red-100 text-red-800 text-xs rounded truncate">
                      Discovery Deadline
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex gap-4 items-start p-3 rounded-md border bg-card hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="mt-0.5">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-1 w-full">
                  <h4 className="text-sm font-semibold leading-none flex items-center justify-between">
                    {event.title}
                    {event.urgent && <span className="h-2 w-2 bg-red-600 rounded-full"></span>}
                  </h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-3 w-3" /> {event.time}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs font-normal">
                    <Briefcase className="mr-1 h-3 w-3" /> {event.case}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

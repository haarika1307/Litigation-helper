import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InsightsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">AI Analytics & Insights</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Generate Summary Report</Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Probability Shift</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+12.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Across all active cases in the last 30 days based on evidence strength.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Factors Identified</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">8</div>
            <p className="text-xs text-muted-foreground mt-1">Found in recent document uploads. Review recommended.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Extracted Entities</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,402</div>
            <p className="text-xs text-muted-foreground mt-1">People, dates, amounts, and locations indexed for search.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Case Action Priority matrix</CardTitle>
            <CardDescription>AI-recommended cases needing immediate attention.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
               <div className="relative border-l-2 border-red-500 pl-4 py-1">
                 <h4 className="text-md font-semibold">Estate of M. Williams</h4>
                 <p className="text-sm text-muted-foreground mb-2">Discovery deadline in 3 days. Missing crucial banking statements.</p>
                 <Button variant="secondary" size="sm">Go to Case</Button>
               </div>
               <div className="relative border-l-2 border-amber-500 pl-4 py-1">
                 <h4 className="text-md font-semibold">Tech Solutions vs Infinity</h4>
                 <p className="text-sm text-muted-foreground mb-2">Opposing counsel filed motion to dismiss. Need to draft response.</p>
                 <Button variant="secondary" size="sm">Go to Case</Button>
               </div>
               <div className="relative border-l-2 border-blue-500 pl-4 py-1">
                 <h4 className="text-md font-semibold">Smith v. Johnson Corp</h4>
                 <p className="text-sm text-muted-foreground mb-2">Deposition scheduled. 42 new documents processed and ready for review.</p>
                 <Button variant="secondary" size="sm">Go to Case</Button>
               </div>
             </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Cross-Case Entity Map</CardTitle>
            <CardDescription>Common entities discovered across multiple cases.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 border rounded-md min-h-[300px] bg-slate-50">
              <Lightbulb className="h-10 w-10 text-muted-foreground mb-4 opacity-30" />
              <p className="text-center font-medium">Relationship Graph View</p>
              <p className="text-sm text-center text-muted-foreground mt-2 px-6">
                Visualizing common witnesses, expert entities, and corporate structures across your active cases.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { use } from "react";
import { ArrowLeft, Upload, FileText, Scale, Clock, CheckSquare, Lightbulb, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CaseWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  // Mock case data for UI design
  const caseData = {
    id: resolvedParams.id,
    name: "Smith v. Johnson Corp",
    court: "US District Court, NY",
    opponent: "Johnson Corp",
    nextHearingDate: "Oct 12, 2024",
    status: "Active",
    notes: "Crucial deposition scheduled for next week. Review newly submitted evidence regarding contract signatures.",
    stats: {
      documents: 42,
      evidence: 89,
      tasks: 12
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Case Header */}
      <div className="bg-white border-b px-4 md:px-8 py-6 space-y-4 shrink-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/cases" className="flex items-center hover:text-foreground hover:underline transition-colors">
            <ArrowLeft className="mr-1 h-3 w-3" /> Back to Cases
          </Link>
          <span className="mx-2">/</span>
          <span>{caseData.id}</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{caseData.name}</h1>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {caseData.status}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-6 gap-y-2">
              <span className="flex items-center"><User className="mr-1.5 h-4 w-4" /> Opponent: {caseData.opponent}</span>
              <span className="flex items-center"><Scale className="mr-1.5 h-4 w-4" /> Court: {caseData.court}</span>
              <span className="flex items-center"><Clock className="mr-1.5 h-4 w-4" /> Next Hearing: {caseData.nextHearingDate}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline"><User className="mr-2 h-4 w-4" /> Share</Button>
            <Button><Upload className="mr-2 h-4 w-4" /> Add Document</Button>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 md:px-8 border-b bg-white shrink-0">
          <TabsList className="bg-transparent h-14 p-0">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full bg-transparent px-4">Overview</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full bg-transparent px-4">Documents</TabsTrigger>
            <TabsTrigger value="evidence" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full bg-transparent px-4">Evidence</TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full bg-transparent px-4">Timeline</TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full bg-transparent px-4">Tasks</TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full bg-transparent px-4">Insights</TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents Container - Needs to be scrollable */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50/50">
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="m-0 focus-visible:outline-none h-full">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80 leading-relaxed bg-slate-50 p-4 rounded-md border border-slate-100">
                      {caseData.notes}
                    </p>
                  </CardContent>
                </Card>
                
                <h3 className="text-lg font-medium mt-8 mb-4">Quick Stats</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Documents</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{caseData.stats.documents}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Evidence Items</CardTitle>
                      <Scale className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{caseData.stats.evidence}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                      <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{caseData.stats.tasks}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md flex items-center">
                      <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
                      Key Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm border-l-2 border-amber-400 pl-3">
                      <p className="font-medium">Missing Contract Page</p>
                      <p className="text-muted-foreground mt-1">Page 4 of the employment agreement appears to be missing from recent uploads.</p>
                    </div>
                    <Separator />
                    <div className="text-sm border-l-2 border-blue-400 pl-3">
                      <p className="font-medium">Date Inconsistency</p>
                      <p className="text-muted-foreground mt-1">Witness testimony date conflicts with system logs by 2 days.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Placeholders for other tabs to complete the Workspace UX */}
          <TabsContent value="documents" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Manage and view case documents.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center border-2 border-dashed rounded-md bg-muted/20">
                <div className="text-center">
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">Drag and drop documents here or click to upload</p>
                  <Button className="mt-4" variant="outline">Select Files</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="evidence" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
                <CardDescription>Structured evidence extracted from documents.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px]">
                <div className="text-center py-20">
                  <Scale className="mx-auto h-8 w-8 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-sm text-muted-foreground">Evidence items will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
                <CardDescription>Chronological events automatically extracted.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px]">
                <div className="text-center py-20">
                  <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-sm text-muted-foreground">No events populated yet.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Manage tasks for this case.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px]">
                <div className="text-center py-20">
                  <CheckSquare className="mx-auto h-8 w-8 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-sm text-muted-foreground">No pending tasks.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>Deep analysis and connections found across case data.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px]">
                <div className="text-center py-20">
                  <Lightbulb className="mx-auto h-8 w-8 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-sm text-muted-foreground">Upload documents to generate insights.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}

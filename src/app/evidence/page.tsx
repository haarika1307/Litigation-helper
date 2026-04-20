"use client";

import { useEffect, useState } from "react";
import { Filter, Search, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

export default function EvidencePage() {
  const [evidenceData, setEvidenceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvidence();
  }, []);

  const fetchEvidence = async () => {
    try {
      const { data } = await api.get("/evidence");
      setEvidenceData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading evidence...</div>;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Global Evidence Master</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Scale className="mr-2 h-4 w-4" /> Add Evidence Manually
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search all evidence..." 
              className="pl-9 w-full" 
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filters (Case, Type, Date)
          </Button>
        </div>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Case</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden md:table-cell">Source File</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evidenceData.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-slate-50">
                  <TableCell className="font-medium text-blue-600">{item.id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.type}</Badge>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-muted-foreground">{item.case}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="hidden md:table-cell underline text-muted-foreground decoration-dotted underline-offset-4">{item.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

export default function CasesPage() {
  const [allCases, setAllCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const { data } = await api.get("/cases");
      setAllCases(data);
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading cases...</div>;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Cases</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Case
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search cases..." 
              className="pl-9 w-full" 
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case Name</TableHead>
                <TableHead>Court</TableHead>
                <TableHead className="hidden md:table-cell">Opposing Party</TableHead>
                <TableHead>Next Hearing</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCases.map((caseItem) => (
                <TableRow key={caseItem.id} className="cursor-pointer hover:bg-slate-50">
                  <TableCell className="font-medium">
                    <Link href={`/cases/${caseItem.id}`} className="block w-full">
                      {caseItem.name}
                    </Link>
                  </TableCell>
                  <TableCell>{caseItem.court}</TableCell>
                  <TableCell className="hidden md:table-cell">{caseItem.opponent}</TableCell>
                  <TableCell>{caseItem.nextHearing}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={caseItem.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                      {caseItem.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

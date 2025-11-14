"use client";

import Link from "next/link";
import { Tour } from "@/lib/types";
import { deleteTour } from "@/lib/actions";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

type Props = { tours: Tour[] };

export function AdminToursTable({ tours }: Props) {
  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(p);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    const result = await deleteTour(id);

    if (result.success) {
      toast.success("Tour deleted!");
      window.location.reload(); // Refresh page
    } else {
      toast.error("Failed to delete tour!");
    }
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tours.map((t) => (
            <TableRow key={t._id}>
              <TableCell>{t.title}</TableCell>
              <TableCell>{t.destination}</TableCell>
              <TableCell>{formatPrice(t.price)}</TableCell>

              <TableCell className="flex justify-end gap-2">

                {/* Edit Button */}
                <Link href={`/admin/edit/${t._id}`}>
                  <Button variant="outline" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </Link>

                {/* Delete Button */}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(t._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

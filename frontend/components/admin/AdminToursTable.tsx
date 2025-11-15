"use client";

import Link from "next/link";
import Image from "next/image";
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
import { useState } from "react";

type Props = { tours: Tour[] };

export function AdminToursTable({ tours }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(p);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    setLoadingId(id);

    const result = await deleteTour(id);

    if (result.success) {
      toast.success("Tour deleted!");
      window.location.reload();
    } else {
      toast.error("Failed to delete tour!");
      setLoadingId(null);
    }
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tours.map((t) => (
            <TableRow key={t._id}>
              {/* ⭐ Small Image Preview */}
              <TableCell>
                <div className="w-12 h-12 relative rounded-md overflow-hidden border">
                  <Image
                    src={t.image.url}
                    alt={t.title}
                    fill
                    sizes="50px"
                    className="object-cover"
                  />
                </div>
              </TableCell>

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
                  disabled={loadingId === t._id}
                  onClick={() => handleDelete(t._id)}
                >
                  {loadingId === t._id ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

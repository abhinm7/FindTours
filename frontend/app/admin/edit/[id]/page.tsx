import EditTourPageClient from "./EditTourPageClient";

export default async function EditTourPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return <EditTourPageClient id={id} />;
}
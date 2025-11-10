import { getStudents } from '@/lib/actions';
import StudentsClient from './StudentsClient';

export default async function StudentsPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const params = await searchParams; // await za razrešenje Promise-a
  const students = await getStudents(params?.search);
  return <StudentsClient students={students} search={params?.search} />;
}

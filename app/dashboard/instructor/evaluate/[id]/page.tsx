import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import EvaluateForm from '@/components/EvaluateForm/EvaluateForm';

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // const { data, error } = await supabase
  const { data } = await supabase.from('ta_positions').select('ta_evaluation').eq('id', params.id);

  // return <EvaluateForm data={data} id={params.id} error={error} />;
  return <EvaluateForm data={data} id={params.id} />;
}

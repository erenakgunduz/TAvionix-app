'use client';

import { Button, Textarea } from '@mantine/core';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import submitEvaluation from '@/utils/actions/submit-evaluation';

interface EvaluateFormProps {
  data:
    | {
        ta_evaluation: string | null;
      }[]
    | null;
  id: string;
  // error: unknown;
}

export default function EvaluateForm({ data, id }: EvaluateFormProps) {
  const router = useRouter();

  const clientAction = async (formData: FormData) => {
    const result = await submitEvaluation(formData, id);
    if (result === 'Evaluation submitted!') {
      toast.success(result);
    } else {
      toast.error(result);
    }
    setTimeout(() => router.push('/dashboard/instructor'), 2000);
  };

  return (
    <form action={clientAction}>
      <Textarea
        label="Evaluation"
        name="evaluation"
        defaultValue={data![0].ta_evaluation ?? ''}
        description="Please provide your evaluation below"
        autosize
        minRows={8}
      />
      <Button onClick={() => router.push('/dashboard/instructor')} mt={20} color="red">
        Cancel
      </Button>
      <Button type="submit" mx={10}>
        Save
      </Button>
    </form>
  );
}

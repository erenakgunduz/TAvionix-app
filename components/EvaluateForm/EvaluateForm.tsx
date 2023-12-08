'use client';

import { Button, Textarea } from '@mantine/core';
import toast from 'react-hot-toast';
import submitEvaluation from '@/utils/actions/submit-evaluation';

interface EvaluateFormProps {
  data:
    | {
        ta_evaluation: string | null;
      }[]
    | null;
  id: string;
  error: unknown;
}

export default function EvaluateForm({ data, id, error }: EvaluateFormProps) {
  const clientAction = async (formData: FormData) => {
    const result = await submitEvaluation(formData, id);
    if (result === 'Evaluation submitted!') {
      toast.success(result);
    } else {
      toast.error(result);
    }
  };

  return (
    <form action={clientAction}>
      <Textarea
        label="Evaluation"
        name="evaluation"
        defaultValue={data![0].ta_evaluation ?? ''}
        description="Please provide your evaluation below"
      />
      <Button type="submit" color="red">
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </form>
  );
}

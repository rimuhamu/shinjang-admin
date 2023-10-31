'use client';

import * as z from 'zod';
import axios from 'axios';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Order, STATUS } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/AlertModal';
import { ImageUpload } from '@/components/ImageUpload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface OrderFormProps {
  initialData: Order | null;
}

const formSchema = z.object({
  phone: z.string().min(1),
  productId: z.string().min(1),
  isPaid: z.boolean().default(false).optional(),
  status: z.nativeEnum(STATUS),
});

type OrderFormValues = z.infer<typeof formSchema>;

export const OrderForm = ({ initialData }: OrderFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? 'Edit order' : 'Create order';
  const description = initialData ? 'Edit a order' : 'Add a new order';
  const toastMessage = initialData ? 'Order updated.' : 'Order created.';
  const action = initialData ? 'Save changes' : 'Create order';

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      productId: '',
      phone: '',
      isPaid: false,
      status: STATUS.ORDERED,
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/orders/${params.orderId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/orders`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/orders`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/orders/${params.orderId}`);
      router.refresh();
      router.push(`/${params.storeId}/orders`);
      toast.success('Order deleted.');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}>
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'>
          <div className='grid grid-cols-3 gap-8'>Input Field</div>
          <Button
            disabled={loading}
            className='ml-auto'
            type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

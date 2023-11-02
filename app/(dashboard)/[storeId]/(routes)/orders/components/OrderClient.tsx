'use client';

import { Heading } from '@/components/Heading';

import { Separator } from '@/components/ui/separator';

import { OrderColumn, columns } from './Columns';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ApiList } from '@/components/ApiList';

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient = ({ data }: OrderClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Orders (${data.length})`}
          description='Manage orders for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/orders/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey='products'
      />
      <Heading
        title='API'
        description='API calls for Orders'
      />
      <Separator />
      <ApiList
        entityName='orders'
        entityIdName='orderId'
      />
    </>
  );
};

'use client';

import { Heading } from '@/components/Heading';

import { Separator } from '@/components/ui/separator';

import { OrderColumn, columns } from './Columns';
import { DataTable } from '@/components/DataTable';

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
      />
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey='products'
      />
    </>
  );
};

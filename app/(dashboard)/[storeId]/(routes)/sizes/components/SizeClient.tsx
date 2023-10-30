'use client';

import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { SizeColumn, columns } from './Columns';
import { DataTable } from '@/components/DataTable';
import { ApiList } from '@/components/ApiList';

interface SizeClientProps {
  data: SizeColumn[];
}

export const SizeClient = ({ data }: SizeClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Sizes (${data.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey='name'
      />
      <Heading
        title='API'
        description='Api calls for Sizes'
      />
      <Separator />
      <ApiList
        entityName='sizes'
        entityIdName='sizeId'
      />
    </>
  );
};

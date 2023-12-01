import { Suspense } from 'react';

import { Metadata } from 'next';

import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/pagination';
import Table from '@/app/ui/customers/table';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';

import { fetchCustomersPages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'View and manage all your customers.',
};

type DashboardCustomersPageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function DashboardCustomersPage({
  searchParams,
}: DashboardCustomersPageProps) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customer..." />
        <CreateCustomer />
      </div>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

import { Metadata } from 'next';

import { notFound } from 'next/navigation';

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

type DashboardInvoicesEditPageProps = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: 'Edit Invoice',
  description: 'Edit invoice.',
};

export default async function DashboardInvoicesEditPage({
  params,
}: DashboardInvoicesEditPageProps) {
  const { id } = params;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}

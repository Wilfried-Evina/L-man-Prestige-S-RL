import AdminApp from '../../../components/admin/AdminApp'

export default function AdminPage({ params }: { params: { locale: string } }) {
  // The admin route is not linked publicly. Access it directly for testing: /fr/admin
  return <AdminApp />
}

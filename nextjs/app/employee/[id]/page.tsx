import EditEmployee from '@/component/EditEmployee'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditEmployeePage({ params }: Props) {
  const { id } = await params
  return <EditEmployee id={id} />
}
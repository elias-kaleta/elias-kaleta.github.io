import ChoresList from '../../components/ChoresList/ChoresList'
import CreateAnnouncement from '../../components/CreateAnnouncement/CreateAnnouncement'
import CreateChore from '../../components/CreateChore/CreateChore'
import FlatAnnouncements from '../../components/FlatAnnouncements/FlatAnnouncements'
import Sidebar from './Sidebar'
import ErrorPage from '../ErrorPage'
import ShopList from '../../components/ShoppingList/ShopList'
import Bills from '../../components/Bills/Bills'
import { useGetFlatByAuthId } from '../../hooks/useFlats'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/UI/Button'

function Dashboard() {
  const { data: flatId, isLoading, isError } = useGetFlatByAuthId()

  const navigate = useNavigate()

  if (isLoading) {
    return <>Loading</>
  }

  if (isError) {
    return <ErrorPage />
  }

  if ((flatId !== undefined && flatId === null) || flatId === 0) {
    // The user doesn't have a flat yet
    // TODO: to be styled
    return (
      <div className="flex h-screen items-center justify-center bg-inherit">
        <div className="text-center">
          <div className="mt-32 flex">
            <h1 className="no-flat font-bold">No Flat? No Problem!</h1>
          </div>
          <h1 className="no-flex text-3xl font-bold">
            Click below and we will get you all set up!
          </h1>
          <Button
            className="m-14 h-28 w-64 rounded-2xl text-3xl font-bold"
            onClick={() => {
              navigate(`/flat_setup`, { replace: true })
            }}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-inherit p-8">
      <div className="flex w-full flex-col md:flex-row">
        <div className="w-full flex-col space-y-8 md:w-1/3 md:px-8">
          <Sidebar flatId={flatId} />
        </div>

        <div className="w-full flex-col space-y-8">
          <div className="flex w-full flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
            {/* Left Column */}
            <div className="flex w-full flex-col space-y-3">
              {/* Announcements */}
              <div className="rounded-xl bg-white">
                <h3 className="m-2 mb-5 text-center text-2xl font-bold text-primary">
                  <br></br>
                  Announcements
                </h3>
                <CreateAnnouncement flatId={flatId} />
                <FlatAnnouncements flatId={flatId} />
                <br></br>
              </div>
              <div />
            </div>
            {/* Right Column */}
            <div className="flex w-full flex-col space-y-5 pr-7">
              {/* Shopping List */}
              <div className="w-full rounded-xl bg-white">
                <h3 className="m-2 mb-5 text-center text-2xl font-bold text-primary">
                  <br></br>
                  Shopping List
                </h3>
                <div className="flex flex-row space-x-4">
                  <div className="flex-grow">
                    <ShopList flatId={flatId} />
                  </div>
                </div>
              </div>
              {/* Chores */}
              <div className="flex w-full flex-col space-y-8">
                <div className="flex-grow rounded-xl bg-white p-6">
                  <h3 className="m-2 mb-5 text-center text-2xl font-bold text-primary">
                    Chores
                  </h3>
                  <div className="flex w-full flex-col space-y-8">
                    <div className="flex-grow">
                      <ChoresList flatId={flatId} />
                      <CreateChore flatId={flatId} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Bills */}
              <div className="flex flex-col space-y-8">
                <div className="flex-grow rounded-xl bg-white p-6">
                  <h3 className="m-2 mb-5 text-center text-2xl font-bold text-primary">
                    Bills
                  </h3>
                  <div className="flex flex-row space-x-4">
                    <div className="flex-grow">
                      <Bills />
                    </div>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

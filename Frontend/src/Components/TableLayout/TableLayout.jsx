import React from 'react'

const TableLayout = () => {
  return (
    <>
    <div className="container mx-auto p-8 text-center">
      <table className='table-auto w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
          <thead className='bg-gray-50'>
              <tr className='border-b'>
                  <th className='px-6 py-4 text-center text-sm font-semibold text-gray-600'>Table No</th>
                  <th className='px-6 py-4 text-center text-sm font-semibold text-gray-600'>Capacity</th>
                  <th className='px-6 py-4 text-center text-sm font-semibold text-gray-600'>Status</th>
                  <th className='px-6 py-4 text-center text-sm font-semibold text-gray-600'>View</th>
              </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
              <tr className='hover:bg-gray-50 transition-colors duration-200'>
                  <td className='px-6 py-4 text-sm text-gray-500'>1</td>
                  <td className='px-6 py-4 text-sm text-gray-500'>4</td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full'>
                      Occupied
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <button className='px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors duration-200'>
                      VIEW TABLE
                    </button>
                  </td>
              </tr>
              <tr className='hover:bg-gray-50 transition-colors duration-200'>
                  <td className='px-6 py-4 text-sm text-gray-500'>2</td>
                  <td className='px-6 py-4 text-sm text-gray-500'>4</td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full'>
                      Occupied
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <button className='px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors duration-200'>
                      VIEW TABLE
                    </button>
                  </td>
              </tr>
              <tr className='hover:bg-gray-50 transition-colors duration-200'>
                  <td className='px-6 py-4 text-sm text-gray-500'>3</td>
                  <td className='px-6 py-4 text-sm text-gray-500'>4</td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full'>
                      Occupied
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <button className='px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors duration-200'>
                      VIEW TABLE
                    </button>
                  </td>
              </tr>
              <tr className='hover:bg-gray-50 transition-colors duration-200'>
                  <td className='px-6 py-4 text-sm text-gray-500'>4</td>
                  <td className='px-6 py-4 text-sm text-gray-500'>4</td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full'>
                      Occupied
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <button className='px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors duration-200'>
                      VIEW TABLE
                    </button>
                  </td>
              </tr>
              <tr className='hover:bg-gray-50 transition-colors duration-200'>
                  <td className='px-6 py-4 text-sm text-gray-500'>5</td>
                  <td className='px-6 py-4 text-sm text-gray-500'>4</td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full'>
                      Occupied
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <button className='px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors duration-200'>
                      VIEW TABLE
                    </button>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
    </>
  )
}

export default TableLayout
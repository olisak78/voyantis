import { SetStateAction, useState } from 'react';

type ListProps = {
  items: { name: string; messageCount: number }[];
};

export default function List({ items }: ListProps) {
  const [selectedQueue, setSelectedQueue] = useState('');
  const [queueMessage, setQueueMessage] = useState('');
  const handleSelectQueue = (queueName: SetStateAction<string>) => {
    setSelectedQueue(queueName);
  };

  const handleGoClick = () => {
    fetch(`/api/queue/${selectedQueue}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setQueueMessage(data.message);
        } else {
          setQueueMessage('No content');
        }
      });
  };
  return (
    <ul
      role='list'
      className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
    >
      {items.map((item) => (
        <li
          key={item.name}
          className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'
        >
          <div className='flex w-full items-center justify-between space-x-6 p-6'>
            <div className='flex-1 truncate'>
              <div className='flex items-center space-x-3'>
                <h3 className='truncate text-sm font-medium text-gray-900'>
                  {item.name}
                </h3>
              </div>
              <p className='mt-1 truncate text-sm text-gray-500'>
                {item.messageCount} messages
              </p>
            </div>
          </div>
          <div>
            <div className='-mt-px flex divide-x divide-gray-200'>
              <div className='flex w-0 flex-1'>
                <button
                  type='button'
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Go
                </button>
              </div>
              <div className='-ml-px flex w-0 flex-1'></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

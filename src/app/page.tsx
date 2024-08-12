'use client';
import { useState, useEffect } from 'react';
import List from './List';

export default function Home() {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    fetch('/api/queues')
      .then((res) => res.json())
      .then((data) => setQueues(data));
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center '>
      <h1 className='text-2xl font-bold mb-4'>Available Queues</h1>
      <List items={queues} />
    </div>
  );
}

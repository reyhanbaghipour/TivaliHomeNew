import { useState } from 'react';

export default function Home() {
  const [date, setDate] = useState<{ to: number | null; from: number | null }>({
    from: null,
    to: null,
  });

  if (date.from) {
    console.log(new Date(date.from).toLocaleDateString('fa'));
  }

  return <></>;
}

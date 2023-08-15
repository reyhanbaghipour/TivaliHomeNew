import { DEVICESIZES } from '@/utils/interfaces';
import { useState, useEffect } from 'react';

const useMediaQuery = (
  query: 'XSUP' | 'SMUP' | 'MDUP' | 'LGUP' | 'XLUP' | 'XXLUP'
): { match: boolean; loading: boolean } => {
  const [match, setMatch] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(DEVICESIZES[query]);

    if (media.matches) {
      setMatch(media.matches);
      setLoading(false);
    }
    const listener = () => {
      setMatch(media.matches);
      setLoading(false);
    };
    media.addListener(listener);
    setLoading(false);
    return () => media.removeListener(listener);
  }, [match, loading]);

  return { match, loading };
};
export default useMediaQuery;

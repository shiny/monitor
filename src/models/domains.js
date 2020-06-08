import { useState, useCallback } from 'react';

export default function useDomainModel() {
  const [ domains, setDomains ] = useState(null);

  const load = useCallback( page => {

  }, []);

  return {
      domains,
      load
  }
}

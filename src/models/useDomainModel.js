import { useState, useCallback } from 'react';

export default function useDomainModel() {
  const [ domains, setDomains ] = useState(null);
  
  return {
      domains
  }
}

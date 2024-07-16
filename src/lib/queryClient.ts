import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

export const queryClient = cache(() => new QueryClient())();

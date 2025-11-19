import { useEffect } from 'react';
import Image from 'next/image';

import { Button } from '@heroui/button';
import { ModalBody, ModalFooter, useDisclosure } from '@heroui/modal';
import { addToast } from '@heroui/toast';

import { useQuery } from '@tanstack/react-query';

import { CustomModal } from '^/components';
import { fetchCurrencyID, getCountryData, setCurrency } from '^/lib';

export default function LocaleProvider({
  locale,
  hasChosen,
}: {
  locale: string;
  hasChosen: boolean;
}) {
  const currencyData = getCountryData(locale);
  const { onOpenChange } = useDisclosure();
  const isOpen = !hasChosen && currencyData.currency !== 'USD'

  const { isPending, data } = useQuery({
    ...fetchCurrencyID({ search: currencyData.currency }),
    enabled: isOpen,
  });

  console.log('currencyData :>> ', { currencyData, locale, hasChosen });

  const isAvailable = !isPending && data?.data.stats.total === 1;

  const currency = isAvailable
    ? data?.data.currencies[0]
    : data?.data.currencies.find(e => e.symbol === currencyData.currency);

  const handleSteCurrency = async (value: string, onClose: () => void) => {
    try {
      await setCurrency(value);
      onClose();
      addToast({
        color: 'success',
        description: `Currency preference updated to ${currency?.name}`,
      });
    } catch (error) {
      console.error('Failed to set currency:', error);
      addToast({
        color: 'danger',
        description: 'Failed to update currency preference',
      });
    }
  };

  if (isOpen) {
    return (
    <CustomModal
      title="Use Local Currency?"
      defaultOpen
      onOpenChange={onOpenChange}
      size="sm"
      isDismissable={false}
      isKeyboardDismissDisabled>
      {onClose => (
        <>
          <ModalBody>
            <p>
              You are in <strong className="text-primary">{currencyData.name}</strong>. Do you want
              to view all prices in{' '}
              <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
                <Image
                  src={currency?.iconUrl || ''}
                  alt={currency?.symbol || 'Flag'}
                  width={16}
                  height={16}
                />
                <strong>{currency?.name || ''}</strong>
              </span>
              ?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={() => handleSteCurrency(currencyData.currency, onClose)}>
              Yes
            </Button>
            <Button onPress={() => handleSteCurrency('USD', onClose)}>No</Button>
          </ModalFooter>
        </>
      )}
    </CustomModal>
    );
  }
}

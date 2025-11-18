import { Button } from '@heroui/button';
import { ModalBody, ModalFooter, useDisclosure } from '@heroui/modal';
import { addToast } from '@heroui/toast';

import { CustomModal } from '^/components';
import { setCurrency } from '^/lib';

export default function CurrencyProvider({ currency }: { currency: string }) {
  const { onOpenChange, onClose } = useDisclosure();

  const handleSteCurrency = async (value: string) => {
    await setCurrency(value);
    onClose();
    addToast({
      color: 'success',
      description: 'Currency preference updated to Indonesian Rupiah',
    });
  };

  if (currency) {
    return (
      <CustomModal
        title="Use Local Currency?"
        defaultOpen
        onOpenChange={onOpenChange}
        onClose={() => handleSteCurrency('USD')}
        isDismissable={false}
        isKeyboardDismissDisabled>
        <ModalBody>
          <p>
            You are in Indonesia. Do you want to view all prices in 🇮🇩{' '}
            <strong>Indonesian Rupiah</strong>?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={() => handleSteCurrency(currency)}>
            Yes
          </Button>
          <Button onPress={() => handleSteCurrency('USD')}>No</Button>
        </ModalFooter>
      </CustomModal>
    );
  }

  return null;
}

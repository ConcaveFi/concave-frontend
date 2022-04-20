import { Text, Modal, Input } from '@concave/ui'
import dynamic from 'next/dynamic'
import { useLocalStorage } from 'react-use'

const isDevEnv = process.env.VERCEL_ENV === 'preview'
const password = process.env.DEV_PASSWORD || 'aaaa'

export const DevelopGateway = dynamic(
  () =>
    Promise.resolve(() => {
      const [value, setValue] = useLocalStorage('can enter?', false)

      if (!isDevEnv) return null
      return (
        <Modal
          bluryOverlay={true}
          title="Show your worth"
          titleAlign="center"
          isOpen={value !== true}
          onClose={() => {}}
          bodyProps={{ w: '350px', gap: 2 }}
          hideClose
        >
          <Text fontWeight="bold">Enter the pass phrase below</Text>
          <Input onChange={(e) => e.target.value === password && setValue(true)} />
        </Modal>
      )
    }),
  { ssr: false },
)

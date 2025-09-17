import { memo } from 'react'
import { Button, Box } from '@mui/material'

type ModalActionsProps = {
  onClose: () => void
  onRemove: () => void
  onSave: () => void
  disableSave?: boolean
}

export const ModalActions = memo<ModalActionsProps>(
  ({ onClose, onRemove, onSave, disableSave }: ModalActionsProps) => {
    const handleClose = () => onClose()
    const handleRemove = () => onRemove()
    const handleSave = () => onSave()

    return (
      <Box
        sx={{
          'display': 'flex',
          'flexDirection': 'row',
          'justifyContent': 'space-between',
          'flexWrap': 'wrap',
          'gap': 1,
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <Button
          size="large"
          variant="outlined"
          onClick={handleClose}
          aria-label="Закрыть модальное окно"
        >
          Закрыть
        </Button>
        <Button
          size="large"
          variant="outlined"
          color="error"
          onClick={handleRemove}
          aria-label="Удалить задачу"
        >
          Удалить
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={handleSave}
          disabled={disableSave}
          aria-label="Сохранить изменения"
        >
          Сохранить
        </Button>
      </Box>
    )
  },
)

ModalActions.displayName = 'ModalActions'

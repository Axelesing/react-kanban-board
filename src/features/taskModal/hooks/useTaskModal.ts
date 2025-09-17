import { useCallback } from 'react'
import { useUnit } from 'effector-react'
import { TaskStatus } from '@/shared/constants/kanban/data'
import type { Item } from '@/features/taskModal'
import { $$modal } from '@/widgets/Modal'
import { useTaskModalForm } from './useTaskModalForm'
import { useTaskModalActions } from './useTaskModalActions'
import { useTaskModalProps } from './useTaskModalProps'

/**
 * Главный хук для управления модальным окном задач
 */
export function useTaskModal() {
  const [isOpen, setOpen, selectedTask] = useUnit([
    $$modal.$isViewModal,
    $$modal.modalViewSet,
    $$modal.$selectedTask,
  ])

  // Управление формой
  const { values, isValid, createFieldHandlers } = useTaskModalForm({
    isOpen,
    selectedTask,
  })

  // Действия с задачами
  const { closeWithoutSave, saveAndClose, removeAndClose } =
    useTaskModalActions({
      selectedTask,
      values,
      isValid,
      setOpen,
    })

  // Обработчики для полей формы
  const handleUserChange = useCallback(
    (value: Item | null | undefined) => {
      createFieldHandlers('user').onChange(value ?? null)
    },
    [createFieldHandlers],
  )

  const handleStatusChange = useCallback(
    (status: TaskStatus) => {
      createFieldHandlers('status').onChange(status)
    },
    [createFieldHandlers],
  )

  // Создание пропсов для компонентов
  const { taskFormProps, taskSettingsProps, modalActionsProps } =
    useTaskModalProps({
      values,
      isValid,
      createFieldHandlers,
      onUserChange: handleUserChange,
      onStatusChange: handleStatusChange,
      onClose: closeWithoutSave,
      onRemove: removeAndClose,
      onSave: saveAndClose,
    })

  return {
    isOpen,
    closeWithoutSave,
    taskFormProps,
    taskSettingsProps,
    modalActionsProps,
  }
}

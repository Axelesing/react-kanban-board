import { useEffect, useCallback } from 'react'
import { useFormValidation } from '@/shared/lib'
import {
  editTaskValidationConfig,
  type TaskFormData,
} from '@/features/taskModal'
import type { Task } from '@/shared/constants/kanban'

interface UseTaskModalFormProps {
  isOpen: boolean
  selectedTask: Task | null
}

type FieldHandler = {
  value: TaskFormData[keyof TaskFormData]
  error: string | null
  status: 'default' | 'alert' | 'success'
  onChange: (value: TaskFormData[keyof TaskFormData]) => void
  onBlur: () => void
}

/**
 * Хук для управления формой в модальном окне задач
 */
export function useTaskModalForm({
  isOpen,
  selectedTask,
}: UseTaskModalFormProps) {
  const formValidation = useFormValidation<TaskFormData>({
    initialValues: {
      title: null,
      description: null,
      user: null,
      status: 'toDo',
    },
    validationConfig: editTaskValidationConfig,
    validateOnChange: true,
    validateOnBlur: true,
  })

  const {
    values,
    setFieldValue,
    setValues,
    isValid,
    getFieldError,
    getFieldStatus,
  } = formValidation

  // Синхронизация формы с выбранной задачей
  useEffect(() => {
    if (!isOpen || !selectedTask) return

    setValues({
      title: selectedTask.title ?? null,
      description: selectedTask.description ?? null,
      user: selectedTask.user ?? null,
      status: selectedTask.status ?? 'toDo',
    })
  }, [isOpen, selectedTask, selectedTask?.id, setValues])

  const createFieldHandlers = useCallback(
    (fieldName: keyof TaskFormData): FieldHandler => {
      const status = getFieldStatus(fieldName)
      return {
        value: values[fieldName],
        error: getFieldError(fieldName) || null,
        status: status === 'alert' || status === 'success' ? status : 'default',
        onChange: (value: TaskFormData[keyof TaskFormData]) =>
          setFieldValue(fieldName, value ?? null),
        onBlur: () => formValidation.handleBlur(fieldName),
      }
    },
    [values, getFieldError, getFieldStatus, setFieldValue, formValidation],
  )

  return {
    values,
    isValid,
    createFieldHandlers,
    formValidation,
  }
}

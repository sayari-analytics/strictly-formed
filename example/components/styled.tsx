import styled from 'styled-components'

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;
`
export const FlexRow = styled.div<{ end?: boolean }>`
  display: flex;
  gap: 8px;
  justify-content: ${({ end }) => (end ? 'flex-end' : 'flex-start')};
  align-items: center;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: sans-serif;
  font-size: 14px;
  letter-spacing: 0.1;
  line-height: 16px;
  font-weight: 400;
  color: #101419;
`

export const ErrorMsg = styled.span`
  color: #ff0a0a;
`

export const Button = styled.button`
  background-color: #fff;
  border: 1px solid #0a85ff;
  border-radius: 6px;
  color: #0a85ff;
  padding: 6px 12px;
`

export const Input = styled.input<{ width?: number }>`
  background-color: #fff;
  border: 1px solid #101419;
  border-radius: 6px;
  padding: 6px 12px;
  width: ${({ width = 200 }) => `${width}px`};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

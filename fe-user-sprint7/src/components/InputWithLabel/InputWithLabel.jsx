import './InputWithLabel.scss';

export const InputWithLabel = ({ children, label, required }) => {
  return (
    <div className="input-wrapper">
      <label>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      {children}
    </div>
  );
};

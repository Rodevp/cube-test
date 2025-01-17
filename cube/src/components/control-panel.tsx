const ControlPanel: React.FC<{
  onChangeColors: () => void;
}> = ({ onChangeColors }) => {
  return <button onClick={onChangeColors}>Cambiar color</button>;
};

export default ControlPanel;
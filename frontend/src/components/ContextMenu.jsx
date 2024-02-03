import './ContextMenu.css';

const ContextMenu = ({
    id,
    positionX,
    positionY,
    isToggled,
    buttons,
    contextMenuRef,
}) => {
    return (
        <menu 
            style={{
                top: positionY + 2 + 'px',
                left: positionX + 2 + 'px'
            }}
            className={`context-menu ${isToggled ? 'active' : ''}`}
            ref={contextMenuRef}
        >
            {buttons.map((button, index) => {
                function handleClick(a) {
                    button.onClick(a);
                }

                if(button.isSpacer) return <hr key={index}></hr>;

                return (
                    <button
                        onClick={() => handleClick(id)}
                        key={index}
                        className='context-menu-button'
                    >
                        <span id={button.text == 'Delete' ? 'delete' : 'not-delete'} className='icon'>{button.icon}</span>
                        <span id={button.text == 'Delete' ? 'delete' : 'not-delete'} className='text'>{button.text}</span>
                    </button>
                );
            })}
        </menu>
    )
}

export default ContextMenu
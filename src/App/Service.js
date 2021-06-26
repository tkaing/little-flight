const toast = (_toast, _type, _message, _duration = 10000) => {
    _toast.show({
        title: _message,
        status: _type, // (danger, warning, success)
        duration: _duration
    });
};

const capitalize = (string) => {
    return (typeof string !== 'string') ? '' : string.charAt(0).toUpperCase() + string.slice(1);
};

export { toast, capitalize };

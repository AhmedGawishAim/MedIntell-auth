const Copyright = () => {
    const year = new Date().getFullYear();
    return (
        <div className="text-[14px] w-full  text-center">
            Copyright &copy; {year}, MEDintell. All Rights Reserved.
        </div>
    );
};

export default Copyright;

export const Footer = () => {
  return (
    <footer>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <img
            src="/assets/IIM,_Ahmedabad.svg"
            alt="IIM Ahmedabad"
             className="h-12 w-12 mr-4"
             />
          <p className="text-center text-sm leading-loose md:text-left">
            Created as part of TBIT Assignment by Study Group B-1 PGP 2025-27 at IIM Ahmedabad.
          </p>
        </div>
      </div>
    </footer>
  );
};

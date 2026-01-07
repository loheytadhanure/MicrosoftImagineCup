interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
    {children}
  </div>
);



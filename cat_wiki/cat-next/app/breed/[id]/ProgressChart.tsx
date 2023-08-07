export default function ProgressChart({
    value,
    label,
}: {
    value: number;
    label: string;
}) {
    const progressArray = new Array(5).fill(false);
    for (let i = 0; i < value; i++) {
        progressArray[i] = true;
    }
    return (
        <div className="flex items-center justify-between sm:w-3/4">
            <span>{label}:</span>
            <div className="flex gap-2">
                {progressArray.map((highlighted, index) => (
                    <span
                        key={index}
                        className={`${
                            highlighted ? "bg-[#544439]" : "bg-[#E0E0E0]"
                        }  w-8    sm:w-12 lg:w-[3.75rem] h-3 rounded-lg`}
                    ></span>
                ))}
            </div>
        </div>
    );
}

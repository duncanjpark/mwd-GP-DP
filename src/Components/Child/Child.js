export default function Child({ data }) {
    return (
        <div>
        <h2> This is the main list stateless child component. </h2>
        {data.map((item) => (
            <div key={item.id}>{item.get("name")}</div>
        ))}
        </div>
    );
};
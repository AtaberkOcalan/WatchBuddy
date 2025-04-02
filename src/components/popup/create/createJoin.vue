<template>
    <div>
        <p>Katıl</p>
        <div class="top-section">
            <input type="text" placeholder="Katılmak için kod girin" class="code-input" />
            <button class="join-button">Katıl</button>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
p{
    color: #fec040;
    font-size: larger;
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 700;
    margin:  10px;
    padding: 0;
}

.top-section {
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
}

.code-input {
    padding: 8px;
    font-size: 0.75rem;
    border: 1px solid gray;
    border-radius: 5px;
    width: 160px;
}

.join-button {
    padding: 8px 15px;
    font-size: 0.75rem;
    background-color: #f7f7f7;
    color: #3f3f3f;
    border: 1px double gray;
    transition: all 0.3s ease;
    border-radius: 5px;
    cursor: pointer;
}

.join-button:hover {
    color: #7c5d00;
    border: 1px solid #fec040;
}

.join-button:active {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

}

</style>
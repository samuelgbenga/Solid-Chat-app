package uk.samuel.solid_chat.entity.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;


@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class PrivateMessage extends BaseClass{


    @Column(name="chatroom_id")
    private long chatRoomId;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name="sender_id")
    private User sender;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name="receiver_id")
    private User receiver;

    @Column(name="content", length = 1000)
    private String content;

    @Column(name="created_at")
    @CreationTimestamp
    private String createdAt;
}
